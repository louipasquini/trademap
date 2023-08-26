const fastify = require("fastify");
const {
    createPost,
    getPosts,
    editPost,
    deletePost,
    searchPost,
    searchPostId
 } = require("./server/app.js");

const server = fastify();

server.post('/create',(req) => {
    const body = req.body;

    const title = body.title;
    const description = body.description;
    const corpo = body.body;

    return createPost(title,description,corpo)
})

server.get('/',()=>{
    return getPosts()
})

server.post('/editar',(req)=>{
    const body = req.body;
    const id = body.id;
    const title = body.title;
    const description = body.description;
    const corpo = body.body;
    return editPost(id, title, description, corpo)
})

server.post('/delete/:id?',(req)=>{
    const id = req.params.id;
    
    return deletePost(id)
})

server.get('/search/:data?',(req)=>{
    const date = req.params.data
    return searchPost(date)
})

server.get('/searchId/:id?',(req)=>{
    const id = req.params.id;
    return searchPostId(id)
})

server.listen({
    port: 3333
})