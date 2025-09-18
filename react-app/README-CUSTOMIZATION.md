# BIOCOM Website Customization Guide

## Background Customization

To customize the background of your website, edit the `CONFIG` object in `src/App.tsx`:

### Option 1: Black Background (Default)
```javascript
const CONFIG = {
  backgroundType: 'black',
  // ... other settings
};
```

### Option 2: Custom Background Image
```javascript
const CONFIG = {
  backgroundType: 'image',
  backgroundImage: '/your-background-image.jpg', // Place image in public/ folder
  // ... other settings
};
```

## Other Customization Options

- `logoSrc`: Path to your logo image (place in public/ folder)
- `companyName`: Used for alt text and accessibility

## Adding Background Images

1. Place your background image file in the `public/` folder
2. Update the `backgroundImage` path in the CONFIG object
3. Set `backgroundType` to `'image'`

Example:
- Image file: `public/background.jpg`
- Config: `backgroundImage: '/background.jpg'`

## Development

- Run `npm start` to start the development server
- The website will be available at http://localhost:3000
- Changes to the code will automatically reload the page