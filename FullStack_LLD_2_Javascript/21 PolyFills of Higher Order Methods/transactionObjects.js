function processTransactions(transactions) {
    return transactions.reduce((acc, transaction) => {
        const { customerId, amount, date } = transaction;

        // Update total transactions count
        acc.totalTransactions += 1;

        // Update total amount
        acc.totalAmount += amount;

        // Compute average transaction amount
        acc.averageTransactionAmount = acc.totalAmount / acc.totalTransactions;

        // Group transactions by date
        acc.transactionsPerDay[date] = acc.transactionsPerDay[date] || [];
        acc.transactionsPerDay[date].push(transaction);

        // Group transactions by customer
        acc.transactionsByCustomer[customerId] = acc.transactionsByCustomer[customerId] || [];
        acc.transactionsByCustomer[customerId].push(transaction);

        return acc;
    }, {
        totalTransactions: 0,
        totalAmount: 0,
        averageTransactionAmount: 0,
        transactionsPerDay: {},
        transactionsByCustomer: {}
    });
}

// Example Usage
const transactions = [
    { customerId: 1, amount: 100, date: "2024-02-01" },
    { customerId: 2, amount: 200, date: "2024-02-01" },
    { customerId: 1, amount: 150, date: "2024-02-02" },
    { customerId: 3, amount: 50, date: "2024-02-02" },
];

console.log(processTransactions(transactions));
