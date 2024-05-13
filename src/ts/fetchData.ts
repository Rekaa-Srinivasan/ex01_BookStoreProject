import {databases} from './appwrite';
import {Query} from 'appwrite';

async function retrieveBooks(param: any) {
    console.log(param);
    try {
        console.log(`TYPE OF PARAM = ${typeof param}`);
        const books = typeof param === 'number' ? (param === -1 ? await databases.listDocuments('6617abe7972b1276173d', '6617ac1d17a701221af6') : await databases.listDocuments('6617abe7972b1276173d', '6617ac1d17a701221af6', [ Query.equal('bookId', [String(param)]) ])) : await databases.listDocuments('6617abe7972b1276173d', '6617ac1d17a701221af6', [ Query.equal('authorName', [param]) ]);
        console.log(books.documents);
        console.log(`BOOKS = ${books.documents}`);
        return books;
    }catch {
        (error: any) => console.log(error);
    }
}

async function retrieveAuthor(authorId: string) {
    try {
        const author = await databases.listDocuments('6617abe7972b1276173d', '6618fb6b58afdc4cbd1d', [ Query.equal('authorId', [authorId]) ]);
        console.log(`AUTHOR DATA = ${author}`);
        return author;
    }catch {
        (error: any) => console.log(error);
    }
}

async function retrieveBlogs(blogId: number) {
    try {
        const blogs = blogId === -1 ? await databases.listDocuments('6617abe7972b1276173d', '661aada1b27d86cef8a3') : await databases.listDocuments('6617abe7972b1276173d', '661aada1b27d86cef8a3', [ Query.equal('blogId', [blogId]) ]);
        return blogs;
    }catch {
        (error: any) => console.log(error);
    }
}

export {retrieveBlogs};
export {retrieveAuthor};
export {retrieveBooks};