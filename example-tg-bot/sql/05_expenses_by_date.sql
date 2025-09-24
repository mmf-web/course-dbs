SELECT 
    DATE(created_at) as date,
    amount,
    category,
    description
FROM expenses 
ORDER BY created_at DESC;
