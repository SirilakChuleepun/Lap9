const userDetail = document.getElementById("user-detail");
const viewPostsBtn = document.getElementById("view-posts"); 
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

async function fetchUserDetail() {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`); 
        let user = await response.json();
        userDetail.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
        viewPostsBtn.onclick = () => window.location.href = `user-posts.html?id=${user.id}`;
    } catch (error) {
        console.error("Error fetching user details:", error);
        userDetail.innerHTML = "<p>โหลดข้อมูลผิดพลาด</p>";
    }

}

fetchUserDetail();
