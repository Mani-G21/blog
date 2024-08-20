import http from "./slhttp";
import ui from "./UI";

document.addEventListener('DOMContentLoaded', fetchPosts);
document.getElementById('postForm').addEventListener('submit', addPost);
document.getElementById('posts').addEventListener('click', editPost);
document.getElementById('editPostForm').addEventListener('submit', updatePost);
document.getElementById('posts').addEventListener('click', deletePost);
document.getElementById('deletePostForm').addEventListener('submit', forceDeletePost);

function forceDeletePost(evt){
    evt.preventDefault();
    const deleteId = document.getElementById('delete_post_id').value;
    if(deleteId == ""){
        ui.showAlert("deleteModal .modal-content", "#deleteForm", "danger", "Some issue with deleting post, please try again later");
        return;
    }

    http.delete(`http://localhost:8000/posts${deleteId}`)
        .then(data => {
            ui.showAlert(".posts-container", "#posts", "success", "post deleted successfully");
            ui.hideModal('deleteModal');
            fetchPosts();
        })
        .catch(err => console.warn(err));
}

function deletePost(evt){
    if(evt.target.classList.contains('delete')){
        const deleteId = evt.target.dataset.id;
        ui.loadModal('deleteModal');
        document.getElementById('delete_post_id').value = deleteId;
    }
}

function updatePost(evt){
    evt.preventDefault();
    const title = document.getElementById('edit_post_title').value;
    const body = document.getElementById('edit_post_body').value;
    const author = document.getElementById('edit_post_author').value;
    const id = document.getElementById('edit_post_id').value
    if(title == '' || body == '' || author == '' || id ==''){
        ui.showAlert("#editModal .modal-content", "#editPostForm", "danger", "Please fill all the fields");
        return;
    }    

    const post = {
        title,
        body,
        author
    };

    http.put(`http://localhost:8000/posts/${id}`, post)
        .then(data => {
            ui.clearFields();
            ui.showAlert(".posts-container", "#posts", "success", "post updated successfully");
            ui.hideModal('editModal');
            fetchPosts();
        })
        .catch(err => console.warn(err));
}

function fetchPosts(evt){
    http.get('https://mani-g21.github.io/blog/data/db.json/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.warn(err));
}

function editPost(evt){
    if(evt.target.classList.contains('edit')){
        ui.loadModal('editModal');
        const editId = evt.target.dataset.id;
        http.get(`http://localhost:8000/posts/${editId}`)
            .then(post => ui.renderEditForm(post))
            .catch(err => console.warn(err));
    }
}
function addPost(evt){
    evt.preventDefault();
    const title = document.getElementById('post_title').value;
    const body = document.getElementById('post_body').value;
    const author = document.getElementById('post_author').value;
    if(title == '' || body == '' || author == ''){
        ui.showAlert(".posts-container", "#posts", "danger", "Please fill all the fields");
        return;
    }    

    const post = {
        title,
        body,
        author
    };

    http.post('https://mani-g21.github.io/blog/data/db.json', post)
        .then(data => {
            ui.clearFields();
            ui.showAlert(".posts-container", "#posts", "success", "post added successfully");
            fetchPosts();
        })
        .catch(err => console.warn(err));
}