const postsList = document.getElementById("posts-list");
const userName = document.getElementById("user-name");
async function fetchUserPosts() {
    try {
        let urlParams = new URLSearchParams(window.location.search);
        let userId = urlParams.get("id");

        let userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        let user = await userResponse.json();
        userName.textContent = user.name;

        let postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        let posts = await postsResponse.json();
        postsList.innerHTML = posts.map(post => `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="comment-btn" data-post-id="${post.id}">ดูความคิดเห็น</button>
                <div class="comments" id="comments-${post.id}" style="display: none;"></div>
            </div>
        `).join("");

        document.querySelectorAll(".comment-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                let postId = event.target.getAttribute("data-post-id");
                let commentsDiv = document.getElementById(`comments-${postId}`);
                if (commentsDiv.style.display === "none") {
                    let commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                    let comments = await commentsResponse.json();
                    commentsDiv.innerHTML = comments.map(comment => `
                        <p><strong>${comment.name}</strong>: ${comment.body}</p>
                    `).join("");
                    commentsDiv.style.display = "block";
                    event.target.textContent = "ซ่อนความคิดเห็น";
                } else {
                    commentsDiv.style.display = "none";
                    event.target.textContent = "ดูความคิดเห็น";

                }
            });
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        postsList.innerHTML = "<p>โหลดข้อมูลผิดพลาด</p>";
        
    }

}

fetchUserPosts();
