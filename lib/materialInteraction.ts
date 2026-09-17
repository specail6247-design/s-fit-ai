// AI Understanding of Material Interaction & Accessory Layer
export interface AccessoryLayer {
  id: string;
  type: 'bag' | 'ring' | 'necklace' | 'scarf' | 'hat';
  weight: 'light' | 'medium' | 'heavy';
  material: string;
}

export interface MaterialInteraction {
  baseGarmentMaterial: string;
  accessory: AccessoryLayer;
}

export function calculateMaterialInteraction(interaction: MaterialInteraction) {
  // Logic to determine how an accessory interacts with the base garment
  // E.g., heavy necklace rests deeply on delicate silk fabric
  let interactionNotes = '';
  if (interaction.baseGarmentMaterial.toLowerCase().includes('silk') && interaction.accessory.weight === 'heavy') {
     interactionNotes = `The heavy ${interaction.accessory.type} creates deep tension folds on the delicate silk base, requiring physics adjustment (stiffness reduction).`;
  } else if (interaction.baseGarmentMaterial.toLowerCase().includes('denim') && interaction.accessory.weight === 'light') {
     interactionNotes = `The light ${interaction.accessory.type} rests stiffly on the heavy denim base with minimal fabric deformation.`;
  } else {
     interactionNotes = `Standard material interaction applied for ${interaction.accessory.type} over ${interaction.baseGarmentMaterial}.`;
  }

  return {
    success: true,
    physicsAdjustment: interaction.accessory.weight === 'heavy' ? 'increase_gravity_pull' : 'standard',
    notes: interactionNotes
  };
}
