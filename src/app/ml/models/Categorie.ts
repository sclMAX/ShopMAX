export interface CategorieInteface {
    id?: string;
    name?: string;
    total_items_in_this_category?: number;
}

export interface CategorieSetting {
    adult_content?: boolean;
    buying_allowed?: boolean;
    buying_modes?: [];
    coverage_areas?: string;
    currencies?: [];
    fragile?: boolean;
    immediate_payment?: string;
    item_conditions?: [];
    items_reviews_allowed?: boolean;
    max_description_length?: number;
    max_pictures_per_item?: number;
    max_sub_title_length?: number;
    max_title_length?: number;
    price?: string;
    restrictions?: [];
    rounded_address?: boolean;
    seller_contact?: string;
    shipping_modes?: [];
    shipping_options?: [];
    shipping_profile?: string;
    show_contact_information?: boolean;
    simple_shipping?: string;
    stock?: string;
    sub_vertical?: any;
    tags?: [];
    vertical?: any;
    vip_subdomain?: string;
    mirror_category?: any;
    listing_allowed?: boolean;
    maximum_price?: any;
    minimum_price?: any;
}

export interface CategorieDetail extends CategorieInteface {
    picture?: string;
    permalink?: string;
    path_from_root?: Array<CategorieInteface>;
    children_categories?: Array<CategorieInteface>;
    attribute_types?: string;
    settings?: CategorieSetting;
    meta_categ_id?: any;
    attributable?: boolean;
}
