    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const app = express()
    const port = process.env.PORT || 3000
    
    app.use(express.static(path.join(__dirname, '/public')));

    app.set('view engine', 'ejs')

    app.get('/', (req, res) =>{
        res.render('baseMenu', {'title':"Simple Menu"})
    })

    app.listen(port, ()=>(console.log("Listening to the server on 'http://localhost:3000'")))


