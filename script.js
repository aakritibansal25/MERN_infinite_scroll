document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('container');
    const post_loader = document.getElementById('post_loader');
        
    async function fetchPosts() {
        post_loader.classList.remove('hidden');
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const posts = await response.json();

            if (posts.length > 0) {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `<h1>${post.id}</h1><h3>${post.title}</h3><p>${post.body}</p>`;
                    postContainer.appendChild(postElement);
                });
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            post_loader.classList.add('hidden');
        }
    }


    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            fetchPosts();
        }
    }

    fetchPosts();

    window.addEventListener('scroll', handleScroll);
});