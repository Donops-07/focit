export const simulateDelay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export function createSearchIndex(item) {
  return Object.values(item)
    .map(val => (Array.isArray(val) ? val.join(" ") : String(val)))
    .join(" ")
    .toLowerCase();
}

export function paginateData(data, page, limit) {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  return {
    data: data.slice(offset, offset + limit),
    meta: { current_page: page, last_page: totalPages, per_page: limit, total: total }
  };
}

export function hydrateRelations(items, departmentsList) {
  return items.map(item => {
    const tags = (item.relatedDepartmentIds || []).map(deptId => {
      const dept = departmentsList.find(d => d.id === deptId);
      if (dept) {
        return { slug: dept.slug, name: dept.name, color: dept.color };
      }
      return null;
    }).filter(Boolean);

    return { ...item, tags };
  });
}
