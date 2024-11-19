export interface GifImage {
    url: string;
    width: string;
    height: string;
}

export interface GifData {
    id: string;
    title: string;
    images: {
        fixed_width: GifImage;
        original: GifImage;
    };
}

export interface GiphyResponse {
    data: GifData[];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
}
