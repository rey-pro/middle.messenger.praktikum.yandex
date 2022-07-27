type SoketData = {
    type: string;
}

export function hasError(response: any): response is APIError {
    return response && response.reason;
}

export function isPing(response: any): response is SoketData {
    return response && response.type === "pong";
}

export function soketError(response: any): response is SoketData {
    return response && response.type === "error";
}