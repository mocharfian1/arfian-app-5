'use strict'

exports.buildResponseCreateTemplate = (template, checklist, items) => {
    return {
        data: {
            id: template.id,
            attributes: {
                name: template.name,
                checklist: {
                    description: checklist.description,
                    due_interval: checklist.due_interval,
                    due_unit: checklist.due_unit
                },
                items: items.map((v) => {
                    return {
                        description: v.description,
                        urgency: v.urgency,
                        due_interval: v.due_interval,
                        due_unit: v.due_unit
                    }
                })
            }
        }
    }
}