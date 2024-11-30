# LlamaSearch Frontend 🦙

Frontend for LlamaSearch - AI-powered search interface. Built with React and TailwindCSS. 
(Backend code is in a separate repository)
 
 
  return (
    <div>
      <img src="/images/llamasearch.png" alt="LlamaSearch" />
    </div>
  );

## Tech Stack (Frontend)
- React 18.2.0
- TailwindCSS 3.4.15
- Lucide React for icons

## Quick Start

1. **Install**
```bash
npm install
```

2. **Set Environment**
```bash
# Create .env file
REACT_APP_API_URL=your_backend_url  # Point to your backend service
```

3. **Run**
```bash
npm start
```

## Deploy Frontend on Render

1. Push to GitHub
2. Create new Static Site on Render.com
3. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   - Add Environment Variable: `REACT_APP_API_URL`

## Features
- Modern Search UI
- Real-time Results
- Mobile Responsive
- Dark Mode

## Project Structure
```
src/
├── App.js       # Main UI component
├── index.js     # Entry point
└── styles.css   # Global styles & animations
```

## Note
This is the frontend repository. Backend code and deployment instructions are in a separate repository.

## License

MIT License

Copyright (c) 2024 LlamaSearch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.