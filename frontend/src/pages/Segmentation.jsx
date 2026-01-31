import Layout from "./Layout";
import ListSegment from "../components/ListSegment";
import Filter from "../components/Filter";

export default function Segmentation() {
  return (
    <Layout>
      <div />
      <div className="flex flex-col gap-3">
        <Filter />
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Segmentasi Nasabah
                </h1>
                <p className="text-gray-600">
                  Pengelompokan nasabah berbasis AI untuk strategi pemasaran
                  yang lebih efektif
                </p>
              </div>
            </div>

            <ListSegment />
          </div>
        </div>
      </div>
    </Layout>
  );
}
