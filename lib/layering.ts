// Layering Intelligence Engine
// Manages the Z-Index logic and compositing order for "Total Styling" (Clothes + Accessories)

import { ClothingItem } from "@/data/mockData";

// Default Z-Index definitions
export const LAYER_Z_INDEX = {
  SKIN: 0,
  TATTOO: 5,
  UNDERWEAR: 10,
  SOCKS: 15,
  BOTTOMS: 20,
  TOPS: 25,
  DRESSES: 27, // Replaces Tops+Bottoms usually
  OUTERWEAR: 30,
  JEWELRY_NECK: 35, // Default over top
  JEWELRY_WRIST: 35,
  SCARF: 40,
  HAT: 45,
  BAG: 50, // Bag body usually outermost
  GLASSES: 55,
};

export interface LayeredComposition {
  baseImage?: string; // User photo
  layers: {
    item: ClothingItem;
    zIndex: number;
    maskRequired?: boolean; // If true, requires segmentation/inpainting
  }[];
}

export class LayeringEngine {

  /**
   * Sorts a list of selected clothing items based on their Z-Index.
   * Ensures correct rendering order (Background -> Skin -> Clothes -> Accessories).
   */
  sortItemsForTryOn(items: ClothingItem[]): ClothingItem[] {
    return [...items].sort((a, b) => {
      const zA = this.getItemZIndex(a);
      const zB = this.getItemZIndex(b);
      return zA - zB;
    });
  }

  /**
   * Determines the Z-Index for a specific item.
   */
  getItemZIndex(item: ClothingItem): number {
    if (typeof item.zIndex === 'number') {
      return item.zIndex;
    }

    switch (item.category) {
      case 'bottoms': return LAYER_Z_INDEX.BOTTOMS;
      case 'tops': return LAYER_Z_INDEX.TOPS;
      case 'dresses': return LAYER_Z_INDEX.DRESSES;
      case 'outerwear': return LAYER_Z_INDEX.OUTERWEAR;
      case 'accessories':
        return this.getAccessoryZIndex(item.subCategory);
      default: return 20;
    }
  }

  private getAccessoryZIndex(subCategory?: string): number {
    switch (subCategory) {
      case 'hat': return LAYER_Z_INDEX.HAT;
      case 'bag': return LAYER_Z_INDEX.BAG;
      case 'jewelry': return LAYER_Z_INDEX.JEWELRY_NECK;
      case 'scarf': return LAYER_Z_INDEX.SCARF;
      case 'glasses': return LAYER_Z_INDEX.GLASSES;
      default: return 50;
    }
  }

  generateCompositeStrategy(items: ClothingItem[]): LayeredComposition {
    const sorted = this.sortItemsForTryOn(items);

    return {
      layers: sorted.map(item => ({
        item,
        zIndex: this.getItemZIndex(item),
        maskRequired: item.category === 'accessories'
      }))
    };
  }

  validateOutfit(items: ClothingItem[]): string[] {
    const warnings: string[] = [];
    const categories = items.map(i => i.category);

    if (categories.includes('dresses') && (categories.includes('tops') || categories.includes('bottoms'))) {
      warnings.push("Wearing a Dress with Tops/Bottoms might cause visual overlap.");
    }

    if (items.filter(i => i.category === 'outerwear').length > 1) {
      warnings.push("Multiple outerwear items selected. Only the outermost will be fully visible.");
    }

    return warnings;
  }
}

export const layeringEngine = new LayeringEngine();
