import Customers from "./CustomerModel.js";
import Transactions from "./TransactionModel.js";
import Segments from "./SegmentModel.js";
import CustomerSegments from "./CustomerSegmentModel.js";
import Personas from "./PersonaModel.js";
import Recommendations from "./RecommendationModel.js";
import Products from "./ProductModel.js";
import RecommendationHistory from "./RecommendationHistoryModel.js";
import RecommendationFeedback from "./RecommendationFeedbackModel.js";
import PersonaRevisionLog from "./PersonaRevisionLog.js";

Customers.hasMany(Transactions, { foreignKey: "cif" });
Transactions.belongsTo(Customers, { foreignKey: "cif" });

Customers.hasMany(Products, { foreignKey: "cif" });
Products.belongsTo(Customers, { foreignKey: "cif" });

Customers.hasMany(CustomerSegments, { foreignKey: "cif" });
CustomerSegments.belongsTo(Customers, { foreignKey: "cif" });

Customers.hasOne(Personas, { foreignKey: "cif" });
Personas.belongsTo(Customers, { foreignKey: "cif" });

Customers.hasMany(Recommendations, { foreignKey: "cif" });
Recommendations.belongsTo(Customers, { foreignKey: "cif" });

Segments.hasMany(CustomerSegments, { foreignKey: "segment_id" });
CustomerSegments.belongsTo(Segments, { foreignKey: "segment_id" });

Segments.hasMany(Recommendations, { foreignKey: "segment_id" });
Recommendations.belongsTo(Segments, { foreignKey: "segment_id" });

Customers.hasMany(RecommendationHistory, { foreignKey: "cif" });
RecommendationHistory.belongsTo(Customers, { foreignKey: "cif" });

Recommendations.hasMany(RecommendationHistory, {
  foreignKey: "recommendation_id",
});

RecommendationHistory.belongsTo(Recommendations, {
  foreignKey: "recommendation_id",
});

RecommendationHistory.hasMany(RecommendationFeedback, {
  foreignKey: "recommendation_history_id",
});

RecommendationFeedback.belongsTo(RecommendationHistory, {
  foreignKey: "recommendation_history_id",
});

Customers.hasMany(PersonaRevisionLog, { foreignKey: "cif" });

PersonaRevisionLog.belongsTo(Customers, { foreignKey: "cif" });

export {
  Customers,
  Products,
  Transactions,
  Segments,
  CustomerSegments,
  Personas,
  Recommendations,
  RecommendationHistory,
  RecommendationFeedback,
  PersonaRevisionLog,
};
