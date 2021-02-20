const getPosts = async () => {
  const postContainer = document.getElementById("post-container");
  const data = await fetch("https://buttercup-island.glitch.me/latest");
  console.log(data)
  const parsedData = await data.json();
  const posts = parsedData.topic_list.topics;
  const users = parsedData.users;
  posts.forEach((post) => {
    const posted = post.posters
      .map((postUser) => {
        const userInfo = users.findIndex((el) => el.id == postUser.user_id);
        return `<a href="https://forum.freecodecamp.org/u/${users[userInfo].username}">${users[userInfo].username}</a>`
      })
      .join(", ");
    postContainer.innerHTML += `<div class="post"><p class="title"><a href="https://forum.freecodecamp.org/t/${post.id}">${post.title}</a></p><p class="date">Created On: ${new Date(post.created_at).toLocaleString()} | Latest Reply: ${new Date(post.last_posted_at).toLocaleString()}</p><p class="counts">Replies: ${post.posts_count} | Likes: ${post.like_count}</p><p class="users">${posted}</div>`;
  });
};
