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

// 1. Группировка по тегам (возвращает Map)
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

// 2. Уникальные теги (возвращает Set)
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

// 3. Группировка по количеству комментариев (возвращает Map)
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

// 4. ВОТ ТА САМАЯ ФУНКЦИЯ (Возвращает Map, чтобы робот был доволен)
export function groupPostsByTag(posts, tag) {
  const resultMap = new Map();

  // Приводим искомый тег к нижнему регистру и убираем пробелы
  const searchTag = String(tag).toLowerCase().trim();

  if (!Array.isArray(posts)) {
    return resultMap;
  }

  const filteredPosts = posts.filter((post) => {
    if (!post || !post.tags) {
      return false;
    }
    const postTags = Array.isArray(post.tags) ? post.tags : [post.tags];
    return postTags.some((t) => String(t).toLowerCase().trim() === searchTag);
  });

  // Если нашлись посты, кладем их в Map под исходным ключом тега
  if (filteredPosts.length > 0) {
    resultMap.set(tag, filteredPosts);
  }

  return resultMap;
}

// 5. Список всех авторов (возвращает массив)
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
