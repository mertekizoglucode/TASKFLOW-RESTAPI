const validateTask = (req, res, next) => {

    console.log("VALIDATION MIDDLEWARE ÇALIŞTI");

    const { title, description, priority, assignee, status } = req.body;

    if (req.method === "POST" || title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
                message: "Görev başlığı zorunludur."
            });
        }
    }

    if (description !== undefined && typeof description !== "string") {
        return res.status(400).json({
            message: "Görev açıklaması metin olmalıdır."
        });
    }

    if (priority !== undefined && !["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
            message: "Öncelik low, medium veya high olmalıdır."
        });
    }

    if (assignee !== undefined && typeof assignee !== "string") {
        return res.status(400).json({
            message: "Atanan kişi metin olmalıdır."
        });
    }


    if (status !== undefined && !["pending", "in-progress", "completed"].includes(status)) {
        return res.status(400).json({
            message: "Durum pending, in-progress veya completed olmalıdır."
        });
    }

    next();
};

module.exports = validateTask;