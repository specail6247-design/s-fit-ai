export interface BrandAesthetic {
    id: string;
    name: string;
    tier: 'High-End Luxury' | 'K-Fashion Leaders' | 'Mass Market';
    material: string;
    lighting: string;
    stiffness: number;
    texture_zoom_url: string;
}

export const brandAesthetics: BrandAesthetic[] = [
    {
        id: 'gucci',
        name: 'Gucci',
        tier: 'High-End Luxury',
        material: 'Silk/Velvet',
        lighting: 'Cinematic Studio',
        stiffness: 0.2,
        texture_zoom_url: 'https://images.unsplash.com/photo-1620805963286-6218d6bf9bc1?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'chanel',
        name: 'Chanel',
        tier: 'High-End Luxury',
        material: 'Tweed',
        lighting: 'Soft Daylight',
        stiffness: 0.6,
        texture_zoom_url: 'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'musinsa',
        name: 'Musinsa',
        tier: 'K-Fashion Leaders',
        material: 'Cotton/Denim',
        lighting: 'Street Urban',
        stiffness: 0.7,
        texture_zoom_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop'
    }
];

export const getBrandAesthetic = (id: string): BrandAesthetic | undefined => {
    return brandAesthetics.find(b => b.id.toLowerCase() === id.toLowerCase());
};
