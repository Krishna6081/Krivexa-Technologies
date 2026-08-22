import { getDashboardDataService } from '../services/dashboardService.js';

export const getDashboardData = async (req, res) => {
  try {
    const { range = '30d' } = req.query;
    const dashboardData = await getDashboardDataService(range);

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Error in getDashboardData controller:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin dashboard analytics data.'
    });
  }
};
