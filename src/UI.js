import { PostCard } from "./PostCard";
import { Alert } from "./Alert";

class UI {
    constructor(){
        this.postWrapper = document.getElementById("posts");
    }
    showPosts(posts){
        let output = "";
        posts.forEach(post => {
            output += PostCard(post.id, post.title, post.body, post.author);
        });
        this.postWrapper.innerHTML = output;
    }
    renderEditForm(post){
        document.getElementById('edit_post_title').value = post.title;
        document.getElementById('edit_post_author').value = post.author;
        document.getElementById('edit_post_body').value = post.body;
        document.getElementById('edit_post_id').value = post.id;  
    }
    showAlert(parentSelector, beforeSelector, type, message){
        document.querySelector(parentSelector).insertBefore(Alert(type, message), document.querySelector(beforeSelector));
        setTimeout(() => this.clearAlert(), 3000);
    }

    clearAlert(){
        const alertBox = document.querySelector('.alert');
        if(alertBox){
            alertBox.remove();
        }
    }

    clearFields(){
        document.getElementById('post_title').value = '';
        document.getElementById('post_author').value = '';
        document.getElementById('post_body').value = '';
    }

    loadModal(elementId){
        let myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById(elementId));
        myModal.show();
    }

    hideModal(elementId){
        let myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById(elementId));
        myModal.hide();
    }
}

const ui = new UI();
export default ui; 