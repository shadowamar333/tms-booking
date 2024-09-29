// Generate unique booking code based on agentCode
function generateUniqueCode(agentCode) {
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    return TMS${agentCode}${randomPart};
 }
 
 module.exports = { generateUniqueCode };