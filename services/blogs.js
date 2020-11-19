const Blogs = require('../models/blogs');

module.exports = class BlogService {
    async createBlog(blog) {
        return await Blogs.query().insertGraph(blog);
    }

    async updateById(id, blog) {
        const updatedBlog = await Blogs.query().findById(id).patch(blog);
        return updatedBlog;
    }

    async deleteById(blogId) {
        return await Blogs.query().deleteById(blogId);
    }

    async findAll(blog) {
        return await Blogs.query(blog);
    }

    async findById(blogId) {
        const id = await Blogs.query().findById(blogId);
        if (id == undefined) {
            return ({"sorry": `blogId ${blogId} not found!`});
        }
        return id;
    }
}