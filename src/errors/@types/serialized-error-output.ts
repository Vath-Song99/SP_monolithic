export type SerializedErrorOutput = {
    errors: SerialErrorFields[];
}

export type SerializedError = {
    message: string;
    fields?: SerialErrorFields;
}

export type SerialErrorFields = {
    [key: string]: string[];
};