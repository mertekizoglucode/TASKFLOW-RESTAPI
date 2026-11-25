const tasks = [];

const getAllTasks = (filters = {}, pagination = {}, sorting = {}) => {

    let filteredTasks = [...tasks];

    if (filters.status) {
        filteredTasks = filteredTasks.filter(
            task => task.status === filters.status
        );
    }

    if (filters.priority) {
        filteredTasks = filteredTasks.filter(
            task => task.priority === filters.priority
        );
    }

    if (sorting.sortBy) {

        const sortBy = sorting.sortBy;
        const order = sorting.order === "desc" ? -1 : 1;

        filteredTasks.sort((a, b) => {

            const valueA = a[sortBy];
            const valueB = b[sortBy];

            if (sortBy === "createdAt") {
                return (
                    (new Date(valueA).getTime() - new Date(valueB).getTime()) * order
                );
            }

            if (typeof valueA === "string" && typeof valueB === "string") {
                return valueA.localeCompare(valueB) * order;
            }

            if (typeof valueA === "number" && typeof valueB === "number") {
                return (valueA - valueB) * order;
            }

            return 0;
        });
    }

    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 10;

    const totalTasks = filteredTasks.length;

    const totalPages = Math.ceil(totalTasks / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return {
        tasks: paginatedTasks,
        pagination: {
            totalTasks,
            totalPages,
            currentPage: page,
            limit
        }
    };
};

const searchTasks = (keyword) => {

    const searchKeyword = keyword.toLowerCase();

    return tasks.filter(task =>
        (task.title && task.title.toLowerCase().includes(searchKeyword)) ||
        (task.description && task.description.toLowerCase().includes(searchKeyword))
    );
};

const getTasksByAssignee = (assignee) => {

    return tasks.filter(task =>
        task.assignee &&
        task.assignee.toLowerCase() === assignee.toLowerCase()
    );
};

const getTaskById = (id) => {

    return tasks.find(task => task.id === id);
};

const createTask = (data) => {

    const newTask = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        status: "pending",
        priority: data.priority ?? "medium",
        assignee: data.assignee,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    return newTask;
};

const updateTask = (id, data) => {

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return null;
    }

    task.title = data.title ?? task.title;
    task.description = data.description ?? task.description;
    task.priority = data.priority ?? task.priority;
    task.assignee = data.assignee ?? task.assignee;
    task.status = data.status ?? task.status;

    return task;
};

const deleteTask = (id) => {

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return false;
    }

    tasks.splice(taskIndex, 1);

    return true;
};

const getCompletedTasks = () => {

    return tasks.filter(task => task.status === "completed");
};

const getPendingTasks = () => {

    return tasks.filter(task => task.status === "pending");
};

const getTaskSummary = () => {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.status === "completed"
    ).length;

    const pendingTasks = tasks.filter(
        task => task.status === "pending"
    ).length;

    const inProgressTasks = tasks.filter(
        task => task.status === "in-progress"
    ).length;

    return {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks
    };
};

module.exports = {
    getAllTasks,
    searchTasks,
    getTasksByAssignee,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getCompletedTasks,
    getPendingTasks,
    getTaskSummary
};
