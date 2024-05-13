const {Client, Databases} = Appwrite;
const client = new Client();
const databases = new Databases(client);

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6617a891be2612bf76c1');

async function getBlogsInformation() {
    
    try {
        const blogInfo = await databases.listDocuments('6617abe7972b1276173d', '661aada1b27d86cef8a3');
        const content = await blogInfo.documents;
        console.log(content);

        jQuery.map(content, (blog) => {
            const { blogImageUrl, blogUrl, blogTitle, blogDescription, blogAuthor, 
                blogDate, primaryContentTitle, primaryContentDescription, 
                primaryPoints, blogLogo, blogQuote, secondaryContentTitle, 
                secondaryContentDescription, secondaryPoints, blogId } = blog;
            $(".blogArticles").append(`
                <article  class="blogs blog-1">
                    <img class="article_picture" src="`+blogImageUrl+`" alt="Blog Image">
                    <div class="blogInfo">
                        <h3 class="subTitle">`+blogTitle+`</h3>
                        <p class="blogDescription">`+blogDescription+`</p>
                        <p class="blogLink"><a class="blog_direct_link" href="`+blogUrl+`?blogId=`+blogId+`">Read More</a>`+blogAuthor+` - `+blogDate+`</p>
                    </div>
                </article>
            `)
        })

    }catch {
        err => console.log(err);
    }

}
getBlogsInformation();