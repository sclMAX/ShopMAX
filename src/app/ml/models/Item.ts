export interface ItemPicture {
    id?: string;
    url?: string;
    secure_url?: string;
    size?: string;
    max_size?: string;
    quality?: string;
}

export interface ItemInterface {
    id?: string;
    site_id?: string;
    title?: string;
    subtitle?: any;
    seller_id?: number;
    category_id?: string;
    official_store_id?: any;
    price?: number;
    base_price?: number;
    original_price?: any;
    currency_id?: string;
    initial_quantity?: number;
    available_quantity?: number;
    sold_quantity?: number;
    buying_mode?: string;
    listing_type_id?: string;
    start_time?: Date;
    stop_time?: Date;
    end_time?: Date;
    condition?: string;
    permalink?: string;
    thumbnail?: string;
    secure_thumbnail?: string;
    pictures?: Array<ItemPicture>;
    video_id?: any;
    descriptions?: [];
    accepts_mercadopago?: boolean;
    non_mercado_pago_payment_methods?: [];
    shipping?: {
        mode?: 'not_specified',
        local_pick_up?: false,
        free_shipping?: false,
        methods?: [],
        dimensions?: any,
        tags?: []
    };
    international_delivery_mode?: string;
    seller_address?: {
        id?: number,
        comment?: '',
        address_line?: 'Test Address 123',
        zip_code?: '1414',
        city?: {
            id?: '',
            name?: 'Palermo'
        },
        state?: {
            id?: 'AR - C',
            name?: 'Capital Federal'
        },
        country?: {
            id?: 'AR',
            name?: 'Argentina'
        },
        latitude?: -34.5711496,
        longitude?: -58.4232966,
        search_location?: {
            neighborhood?: {
                id?: '',
                name?: ''
            },
            city?: {
                id?: 'TUxBQ0NBUGZlZG1sYQ',
                name?: 'Capital Federal'
            },
            state?: {
                id?: 'TUxBUENBUGw3M2E1',
                name?: 'Capital Federal'
            }
        }
    };
    seller_contact?: any;
    location?: {

    };
    geolocation?: {
        latitude?: -34.5711496,
        longitude?: -58.4232966
    };
    coverage_areas?: [

    ];
    attributes?: [

    ];
    warnings?: [

    ];
    listing_source?: '';
    variations?: [

    ];
    status?: 'active';
    sub_status?: [

    ];
    tags?: [

    ];
    warranty?: any;
    catalog_product_id?: any;
    seller_custom_field?: any;
    parent_item_id?: any;
    differential_pricing?: any;
    deal_ids?: [];
    automatic_relist?: boolean;
    date_created?: Date;
    last_updated?: Date;
}

