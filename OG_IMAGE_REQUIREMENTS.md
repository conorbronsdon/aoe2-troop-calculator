# Open Graph Image Requirements

## Current Status
❌ **MISSING**: The og-image.png file is currently missing from the repository.

## File References
The image is referenced in the following locations:
- `index.html:27` - Open Graph meta tag
- `index.html:37` - Twitter Card meta tag

## Required Specifications

### Dimensions
- **Recommended Size**: 1200 x 630 pixels
- **Aspect Ratio**: 1.91:1
- **Format**: PNG (recommended) or JPG
- **Max File Size**: < 8 MB (recommended < 1 MB for performance)

### Content Guidelines

The image should showcase:
- **Title Text**: "AoE2 Army Calculator"
- **Subtitle**: "Plan Your Compositions"
- **Key Features**:
  - "100+ Units"
  - "51 Civilizations"
  - "Fortifications"
  - "Tech Tree Restrictions"
  - "Accurate Bonuses"
- **Visual Elements**: Consider including iconic AoE2 imagery (castles, units, etc.)
- **Branding**: Clean, professional design matching the calculator theme

### Design Considerations
1. **Text Readability**: All text should be clearly readable when scaled down
2. **Safe Zones**: Keep important content within the center 1200x600px area to avoid cropping
3. **Mobile Preview**: Test how it looks when scaled down to mobile sizes
4. **Dark/Light Themes**: Ensure visibility on both dark and light backgrounds

### Color Scheme
- Primary: #4F46E5 (Indigo - matches theme-color in index.html)
- Accent: Consider AoE2 gold/brown tones
- Background: Clean, not too busy

## File Location
Place the file at: `/public/og-image.png`

## Testing
After creating the image, test the social media preview using:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Example Tools for Creation
- Figma (recommended for design)
- Canva (quick templates)
- Adobe Photoshop
- GIMP (free alternative)
- Online OG image generators

## Priority
**Medium-High**: While the site functions without it, the OG image significantly improves social media sharing appearance and click-through rates.
