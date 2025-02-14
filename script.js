const userList = document.getElementById("user-list");

async function fetchUsers() {
    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let users = await response.json();
        userList.innerHTML = users.map(user => `
            <div class="user-card">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <a href="user-detail.html?id=${user.id}">ดูลายละเอียด</a>
            </div>
            `
        ).join("");
    }catch(error){
        console.error("Error fetching users: ", error);
        userList.innerHTML = "<p>โหลดข้อมูลผิดพลาด</p>";

    }
}

fetchUsers();