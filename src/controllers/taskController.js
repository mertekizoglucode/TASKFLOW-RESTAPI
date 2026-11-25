    const taskService = require("../services/taskService");


const getAllTasks = (req, res) => {

    const filters = {
        status: req.query.status,
        priority: req.query.priority
    };


    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const sortBy = req.query.sortBy;
    const order = req.query.order ?? "asc";

    if (
        !Number.isInteger(page) ||
        !Number.isInteger(limit) ||
        page < 1 ||
        limit < 1
    ) {
        return res.status(400).json({
            message: "Page ve limit pozitif tam sayı olmalıdır."
        });
    }

    const allowedSortFields = [
        "createdAt",
        "title",
        "priority",
        "status"
    ];

    if (sortBy && !allowedSortFields.includes(sortBy)) {
        return res.status(400).json({
            message: "Geçersiz sıralama alanı. Kullanılabilir alanlar: createdAt, title, priority, status."
        });
    }

    if (!["asc", "desc"].includes(order)) {
        return res.status(400).json({
            message: "Sıralama yönü asc veya desc olmalıdır."
        });
    }

    const result = taskService.getAllTasks(
        filters,
        {
            page,
            limit
        },
        {
            sortBy,
            order
        }
    );

    res.status(200).json({
        message: "Görevler başarıyla listelendi.",
        tasks: result.tasks,
        pagination: result.pagination
    });
};


const searchTasks = (req, res) => {

    const keyword = req.query.keyword;

    if (!keyword || keyword.trim() === "") {
        return res.status(400).json({
            message: "Arama kelimesi zorunludur."
        });
    }

    const tasks = taskService.searchTasks(keyword);

    res.status(200).json({
        message: "Arama işlemi başarılı.",
        tasks: tasks
    });
};


const getTasksByAssignee = (req, res) => {

    const assignee = req.params.assignee;

    const tasks = taskService.getTasksByAssignee(assignee);

    res.status(200).json({
        message: "Kullanıcıya atanmış görevler başarıyla listelendi.",
        tasks: tasks
    });
};


const getTaskById = (req, res) => {

    const taskId = Number(req.params.id);

    const task = taskService.getTaskById(taskId);

    if (!task) {
        return res.status(404).json({
            message: "Görev bulunamadı."
        });
    }

    res.status(200).json({
        message: "Görev başarıyla bulundu.",
        task: task
    });
};


const createTask = (req, res) => {

    const newTask = taskService.createTask(req.body);

    res.status(201).json({
        message: "Görev başarıyla oluşturuldu.",
        task: newTask
    });
};


const updateTask = (req, res) => {

    const taskId = Number(req.params.id);

    const updatedTask = taskService.updateTask(taskId, req.body);

    if (!updatedTask) {
        return res.status(404).json({
            message: "Güncellenecek görev bulunamadı."
        });
    }

    res.status(200).json({
        message: "Görev başarıyla güncellendi.",
        task: updatedTask
    });
};


const deleteTask = (req, res) => {

    const taskId = Number(req.params.id);

    const deleted = taskService.deleteTask(taskId);

    if (!deleted) {
        return res.status(404).json({
            message: "Silinecek görev bulunamadı."
        });
    }

    res.status(200).json({
        message: "Görev başarıyla silindi."
    });
};


const getCompletedTasks = (req, res) => {

    const tasks = taskService.getCompletedTasks();

    res.status(200).json({
        message: "Tamamlanan görevler başarıyla listelendi.",
        total: tasks.length,
        tasks: tasks
    });
};


const getPendingTasks = (req, res) => {

    const tasks = taskService.getPendingTasks();

    res.status(200).json({
        message: "Bekleyen görevler başarıyla listelendi.",
        total: tasks.length,
        tasks: tasks
    });
};


const getTaskSummary = (req, res) => {

    const summary = taskService.getTaskSummary();

    res.status(200).json({
        message: "Görev özeti başarıyla oluşturuldu.",
        summary: summary
    });
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