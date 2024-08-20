export function PostCard(id, title, body, author){
    return(`
        <div class="card mb-3">
            <div class = "card-body">
                <h5 class = "card-title">${title}</h5>
                <p class = "card-text">${body}</p>
                <a href = "#" class= "card-link">${author}</a>
                <a href = "#" class = "btn btn-primary pull-right edit" data-id = "${id}">Edit</a>
                <a href = "#" class = "btn btn-danger pull-right me-3 edit" data-id = "${id}">Delete</a>
            </div>
        </div>       
    `);
}