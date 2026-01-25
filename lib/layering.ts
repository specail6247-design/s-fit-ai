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
  JEWELRY_NECK_UNDER: 28, // New dynamic layer
  OUTERWEAR: 30,
  JEWELRY_NECK: 35, // Default over top (and over outerwear if not adjusted)
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

export type InteractionType = 'bag-on-shoulder' | 'necklace-under-jacket' | 'hat-on-hair';

export class LayeringEngine {

  /**
   * Sorts a list of selected clothing items based on their Z-Index.
   * Ensures correct rendering order (Background -> Skin -> Clothes -> Accessories).
   * Now context-aware.
   */
  resolveVisibilityOrder(items: ClothingItem[]): ClothingItem[] {
    let processedItems = items.map(item => ({ ...item })); // Shallow copy to avoid mutation

    const hasOuterwear = processedItems.some(i => i.category === 'outerwear');
    const hasNecklace = processedItems.some(i => i.category === 'accessories' && i.subCategory === 'jewelry');

    // Rule: Necklace: Under jacket, over t-shirt.
    if (hasOuterwear && hasNecklace) {
      processedItems = processedItems.map(item => {
        if (item.category === 'accessories' && item.subCategory === 'jewelry') {
          // Force Z-Index to be under outerwear (30) but over tops (25)
          return { ...item, zIndex: LAYER_Z_INDEX.JEWELRY_NECK_UNDER };
        }
        return item;
      });
    }

    // Sort based on the (potentially modified) Z-Index
    return processedItems.sort((a, b) => {
      const zA = this.getItemZIndex(a);
      const zB = this.getItemZIndex(b);
      return zA - zB;
    });
  }

  // Deprecated alias for backward compatibility if needed, or just redirect
  sortItemsForTryOn(items: ClothingItem[]): ClothingItem[] {
    return this.resolveVisibilityOrder(items);
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
    const sorted = this.resolveVisibilityOrder(items);

    return {
      layers: sorted.map(item => ({
        item,
        zIndex: this.getItemZIndex(item),
        maskRequired: item.category === 'accessories'
      }))
    };
  }

  /**
   * Identifies physical interactions between layers.
   * e.g. "Bag Strap" should deform "Outerwear".
   */
  getInteractions(items: ClothingItem[]): InteractionType[] {
    const interactions: InteractionType[] = [];
    const categories = items.map(i => i.category);
    const subCategories = items.map(i => i.subCategory);

    // Bag vs Outerwear/Top
    if (subCategories.includes('bag') && (categories.includes('outerwear') || categories.includes('tops'))) {
      interactions.push('bag-on-shoulder');
    }

    // Hat vs Hair (Implied always true if hat is present, but useful for physics)
    if (subCategories.includes('hat')) {
      interactions.push('hat-on-hair');
    }

    return interactions;
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
