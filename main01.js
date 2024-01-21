let blogs = [];

function updateBlogCount() {
    document.getElementById('blogCount').innerText = blogs.length;
}

function displayBlogs() {
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';

    blogs.forEach((blog, index) => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
            <p><strong>Title:</strong> ${blog.title}</p>
            <p><strong>Description:</strong> ${blog.description}</p>
            <p><strong>Image URL:</strong> <img src="${blog.imageUrl}" alt="Blog Image" style="max-width: 100%;"></p>
            <button onclick="editBlog(${index})">Edit</button>
            <button onclick="deleteBlog(${index})">Delete</button>
        `;
        blogList.appendChild(blogItem);
    });
}

function postBlog() {
    const imageUrl = document.getElementById('imageUrl').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (imageUrl && title && description) {
        const newBlog = { imageUrl, title, description };
        blogs.push(newBlog);

    
        document.getElementById('imageUrl').value = '';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';

        updateBlogCount();
        displayBlogs();


        axios.post('https://crudcrud.com/api/ed75cda541cb4039ab92bcb8897aad1d/appointmentData', newBlog)
            .then(response => {
                console.log('Blog posted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error posting blog:', error);
            });
    } else {
        alert('Please fill in all fields.');
    }
}

function editBlog(index) {
    const editedBlog = prompt('Edit Blog', JSON.stringify(blogs[index]));

    if (editedBlog) {
        blogs[index] = JSON.parse(editedBlog);
        displayBlogs();

        axios.put(`https://crudcrud.com/api/ed75cda541cb4039ab92bcb8897aad1d/appointmentData/${index}`, blogs[index])
            .then(response => {
                console.log('Blog edited successfully:', response.data);
            })
            .catch(error => {
                console.error('Error editing blog:', error);
            });
    }
}

function deleteBlog(index) {
    const confirmDelete = confirm('Are you sure you want to delete this blog?');

    if (confirmDelete) {
        blogs.splice(index, 1);
        displayBlogs();

        axios.delete(`https://crudcrud.com/api/ed75cda541cb4039ab92bcb8897aad1d/appointmentData/${index}`)
            .then(response => {
                console.log('Blog deleted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error deleting blog:', error);
            });
    }
}

axios.get('https://crudcrud.com/api/ed75cda541cb4039ab92bcb8897aad1d/appointmentData')
    .then(response => {
        blogs = response.data;
        updateBlogCount();
        displayBlogs();
    })
    .catch(error => {
        console.error('Error fetching blogs:', error);
    });
