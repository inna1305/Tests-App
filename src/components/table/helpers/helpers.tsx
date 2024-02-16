import {CapitalizedStatus, CapitalizedType, Site, Status, Test, Type} from '../../../types';
import {ReactElement} from 'react';
import {TableRow} from '../tableRow/TableRow';

export const getCapitalizedType = (type: Type) => {
    switch (type) {
        case Type.CLASSIC:
            return CapitalizedType.CLASSIC;
        case Type.SERVER_SIDE:
            return CapitalizedType.SERVER_SIDE;
        case Type.MVT:
            return CapitalizedType.MVT;
        default:
            throw new Error('Unknown type: ' + type);
    }
}

export const getCapitalizedStatus = (status: Status) => {
    switch (status) {
        case Status.DRAFT:
            return CapitalizedStatus.DRAFT;
        case Status.ONLINE:
            return CapitalizedStatus.ONLINE;
        case Status.PAUSED:
            return CapitalizedStatus.PAUSED;
        case Status.STOPPED:
            return CapitalizedStatus.STOPPED;
        default:
            throw new Error('Unknown status: ' + status);
    }
}

export const getStatusColor = (status: CapitalizedStatus) => {
    const onlineColor = getComputedStyle(document.documentElement).getPropertyValue('--active-color');
    const pausedColor = getComputedStyle(document.documentElement).getPropertyValue('--paused-color');
    const stoppedColor = getComputedStyle(document.documentElement).getPropertyValue('--stop-color');
    const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('----main-font-color');

    switch (status) {
        case CapitalizedStatus.ONLINE:
            return onlineColor;
        case CapitalizedStatus.PAUSED:
            return pausedColor;
        case CapitalizedStatus.STOPPED:
            return stoppedColor;
        default:
            return defaultColor;
    }
}

const getSiteName = (sites: Site[], siteId: number): string => {
    const foundSite = sites.find(site => site.id === siteId);
    return foundSite ? removeProtocolAndWww(foundSite.url) : '';
}

const removeProtocolAndWww = (urlString: string) => {
    return urlString
        .replace(/^(http|https):\/\//, '')
        .replace(/^www\./, '');
}

export const createRows = async (tests: Test[], sites: Site[]): Promise<ReactElement[]> => {
    return tests.map(test => {
        //better to use site name Map here
        const siteName = getSiteName(sites, test.siteId);
        return (
            <TableRow key={test.id}
                      name={test.name}
                      type={getCapitalizedType(test.type)}
                      status={getCapitalizedStatus(test.status)}
                      siteName={siteName}
                      testId={test.id}
                      borderColor={getBorderColorByHash(siteName)
                      }
            />
        );
    })
}

export const filterTestsByName = (tests: Test[], word: string): Test[] => {
    return tests
        .filter(test => test.name.toLowerCase().includes(word.toLowerCase()));
}

export const getBorderColorByHash = (site: string): string => {
    let hash = 0;
    for (let i = 0; i < site.length; i++) {
        hash = site.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = (hash & 0x00FFFFFF).toString(16).toUpperCase();

    while (color.length < 6) {
        color = '0' + color;
    }
    return `#${color}`;
}
