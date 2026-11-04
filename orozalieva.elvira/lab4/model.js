export class BlogPost {
  constructor(id, title, tags = [], comments = []) {
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.comments = comments;
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  addComment(comment) {
    this.comments.push(comment);
  }

  get commentCount() {
    return this.comments.length;
  }
}

export function groupPostsByTags(posts) {
  const map = new Map();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!map.has(tag)) {
          map.set(tag, []);
        }
        map.get(tag).push(post);
      });
    }
  });
  return map;
}

export function getUniqueTags(posts) {
  const set = new Set();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        set.add(tag);
      });
    }
  });
  return set;
}

export function groupPostsByCommentCount(posts) {
  const map = new Map();
  posts.forEach((post) => {
    const count = post.comments ? post.comments.length : 0;
    if (!map.has(count)) {
      map.set(count, []);
    }
    map.get(count).push(post);
  });
  return map;
}

export function groupPostsByTag(posts, tag) {
  let actualPosts = posts;
  let actualTag = tag;

  if (!Array.isArray(actualPosts) && Array.isArray(actualTag)) {
    actualPosts = tag;
    actualTag = posts;
  }

  if (
    actualPosts &&
    typeof actualPosts === 'object' &&
    !Array.isArray(actualPosts)
  ) {
    actualPosts = [actualPosts];
  }

  if (!Array.isArray(actualPosts)) {
    return [];
  }

  return actualPosts.filter((post) => {
    if (!post) {
      return false;
    }
    if (typeof post === 'string') {
      return (
        post.trim().toLowerCase() === String(actualTag).trim().toLowerCase()
      );
    }
    if (post.tags) {
      const postTags = Array.isArray(post.tags) ? post.tags : [post.tags];
      return postTags.some(
        (t) =>
          String(t).trim().toLowerCase() ===
          String(actualTag).trim().toLowerCase(),
      );
    }
    return false;
  });
}

export function getAllCommentAuthors(posts) {
  const authors = [];
  posts.forEach((post) => {
    if (post.comments) {
      post.comments.forEach((comment) => {
        authors.push(comment.author);
      });
    }
  });
  return authors;
}
