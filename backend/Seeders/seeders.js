import db from "../config/Database.js";
import {
  Customers,
  Transactions,
  Segments,
  CustomerSegments,
  Personas,
  Products,
  Recommendations,
  RecommendationFeedback,
  RecommendationHistory,
  PersonaRevisionLog,
} from "../models/index.js";

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log("Database reset");

    const customers = [
      {
        cif: "CIF001",
        name: "Kevin Samosir",
        birth_year: 2003,
        city: "Medan",
        occupation: "Employee",
        monthly_income: 12000000,
      },
      {
        cif: "CIF002",
        name: "Andi Pratama",
        birth_year: 1977,
        city: "Semarang",
        occupation: "Entrepreneur",
        monthly_income: 45000000,
      },
      {
        cif: "CIF003",
        name: "Sinta Mahardika",
        birth_year: 2017,
        city: "Sidoarjo",
        occupation: "Student",
        monthly_income: 4000000,
      },
      {
        cif: "CIF004",
        name: "Budi Santoso",
        birth_year: 1991,
        city: "Jatiluhur",
        occupation: "Manager",
        monthly_income: 25000000,
      },
    ];

    await Customers.bulkCreate(customers);
    console.log("Customers seeded");

    const transactions = [];
    const categories = ["income", "expense"];

    const startYear = 2024;

    customers.forEach((cust) => {
      for (let month = 0; month < 12; month++) {
        transactions.push({
          cif: cust.cif,
          trx_date: new Date(startYear, month, 1),
          category: "income",
          amount: cust.monthly_income,
          channel: "transfer",
        });

        const expenseCount = Math.floor(Math.random() * 3) + 3;

        for (let i = 0; i < expenseCount; i++) {
          transactions.push({
            cif: cust.cif,
            trx_date: new Date(
              startYear,
              month,
              Math.floor(Math.random() * 28) + 1,
            ),
            category: "expense",
            amount: Math.floor(Math.random() * 2000000) + 50000,
            channel: ["card", "qr", "debit"][Math.floor(Math.random() * 3)],
          });
        }
      }
    });

    await Transactions.bulkCreate(transactions);
    console.log(`Transactions seeded: ${transactions.length}`);

    const segments = await Segments.bulkCreate([
      {
        name: "High Spending",
        description: "Customers with consistently high expense behavior",
      },
      {
        name: "Stable Income",
        description: "Customers with regular monthly income",
      },
      {
        name: "Emerging Premium",
        description: "Customers showing upward financial behavior",
      },
    ]);

    console.log("Segments seeded");

    const customerSegments = [
      {
        cif: "CIF001",
        segment_id: segments[1].id,
        confidence_score: 85,
        opportunity_score: 62,
        last_evaluated_at: new Date(),
        ai_reason:
          "Consistent monthly income with moderate expense ratio, but limited indicators for immediate product expansion",
      },
      {
        cif: "CIF002",
        segment_id: segments[0].id,
        confidence_score: 92,
        opportunity_score: 58,
        last_evaluated_at: new Date(),
        ai_reason:
          "High spending behavior observed, however product utilization already near saturation for this segment",
      },
      {
        cif: "CIF002",
        segment_id: segments[2].id,
        confidence_score: 78,
        opportunity_score: 90,
        last_evaluated_at: new Date(),
        ai_reason:
          "Strong income growth combined with increasing transaction value indicates high potential for premium product upsell",
      },
      {
        cif: "CIF004",
        segment_id: segments[1].id,
        confidence_score: 88,
        opportunity_score: 75,
        last_evaluated_at: new Date(),
        ai_reason:
          "Stable income with controlled expenses suggests readiness for savings or investment-oriented product expansion",
      },
    ];

    await CustomerSegments.bulkCreate(customerSegments);
    console.log("CustomerSegments seeded");

    await Personas.bulkCreate([
      {
        cif: "CIF001",
        summary:
          "Young professional with stable income and balanced spending behavior.",
        last_updated_at: new Date(),
      },
      {
        cif: "CIF002",
        summary:
          "High-income entrepreneur with aggressive spending and premium potential.",
        last_updated_at: new Date(),
      },
      {
        cif: "CIF003",
        summary:
          "Student with limited income and highly price-sensitive spending pattern.",
        last_updated_at: new Date(),
      },
      {
        cif: "CIF004",
        summary:
          "Mid-level manager with consistent income and conservative expense behavior.",
        last_updated_at: new Date(),
      },
    ]);

    console.log("Personas seeded");

    await Recommendations.bulkCreate([
      {
        cif: "CIF002",
        segment_id: segments[0].id,
        recommendation: "Upgrade to premium credit card",
        ai_reason:
          "Spending behavior exceeds average customer in similar income range",
        is_active: true,
      },
      {
        cif: "CIF004",
        segment_id: segments[1].id,
        recommendation: "Offer investment-linked savings product",
        ai_reason:
          "Stable income with low expense volatility indicates saving capacity",
        is_active: true,
      },
    ]);

    console.log("Recommendations seeded");

    const productTypes = [
      { type: "savings", names: ["BNI Taplus", "BNI Taplus Muda"] },
      {
        type: "credit_card",
        names: ["BNI Silver Card", "BNI Gold Card", "BNI Platinum Card"],
      },
      { type: "deposit", names: ["BNI Deposito"] },
      { type: "investment", names: ["BNI Reksadana", "BNI Obligasi"] },
    ];

    const productsData = [];

    customers.forEach((cust) => {
      const productCount = Math.floor(Math.random() * 4) + 1;

      const chosenTypes = productTypes
        .sort(() => 0.5 - Math.random())
        .slice(0, productCount);

      chosenTypes.forEach((ptype) => {
        const productName =
          ptype.names[Math.floor(Math.random() * ptype.names.length)];

        productsData.push({
          cif: cust.cif,
          product_type: ptype.type,
          product_name: productName,
          status: "active",
        });
      });
    });

    await Products.bulkCreate(productsData);

    const recommendationHistoryData = [];

    const allRecs = await Recommendations.findAll();

    for (const rec of allRecs) {
      const persona = await Personas.findOne({ where: { cif: rec.cif } });

      recommendationHistoryData.push({
        cif: rec.cif,
        recommendation_id: rec.id,

        recommendation_content: JSON.stringify({
          recommendation: rec.recommendation,
          ai_reason: rec.ai_reason,
        }),

        persona_snapshot: persona ? persona.summary : null,
        created_at: new Date(),
      });
    }

    await RecommendationHistory.bulkCreate(recommendationHistoryData);

    console.log("RecommendationHistory seeded");

    const histories = await RecommendationHistory.findAll();

    const feedbacks = [
      {
        recommendation_history_id: histories[0].id,
        action: "TAKE",
        user_reason: null,
        decided_at: new Date(),
      },
      {
        recommendation_history_id: histories[1].id,
        action: "IGNORE",
        user_reason: "Nasabah tidak tertarik produk kartu kredit",
        decided_at: new Date(),
      },
    ];

    await RecommendationFeedback.bulkCreate(feedbacks);
    console.log("RecommendationFeedback seeded");

    await PersonaRevisionLog.bulkCreate([
      {
        cif: "CIF002",
        previous_persona_summary:
          "High-income entrepreneur with aggressive spending and premium potential.",
        revised_persona_summary:
          "High-income entrepreneur with selective product preference and lower credit card interest.",
        trigger_reason: "user_feedback",
        created_at: new Date(),
      },
    ]);
    console.log("PersonaRevisionLog seeded");

    console.log("✅ Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
