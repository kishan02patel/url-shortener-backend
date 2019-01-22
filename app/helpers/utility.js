const useragent = require('useragent')

function getUserInfo(requestData) {
	const agent = useragent.parse(requestData.headers['user-agent'])

	const userInfo = {}
	userInfo.ipAddress = requestData.connection.remoteAddress
	userInfo.browserName = agent.toAgent()
	userInfo.operatingSystem = agent.os.toString()
	userInfo.device = agent.device.toString()

	return userInfo
}

module.exports = {
	getUserInfo
}