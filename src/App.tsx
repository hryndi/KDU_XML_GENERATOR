import Layout from "./components/wrappers/Layout";
import MainForm from "./components/wrappers/MainForm";
import Actions from "./components/mainFormContent/Actions";
import CurrentShipmentHeader from "./components/mainFormContent/CurrentShipmentHeader";
import OriginFileInfo from "./components/mainFormContent/OriginFileInfo";
import Packages from "./components/mainFormContent/Packages";
import RecipientAdress from "./components/mainFormContent/RecipientAdress";
import ShipmentInformation from "./components/mainFormContent/ShipmentInformation";
import ShipmentManager from "./components/ShipmentManager";
import PreviewSection from "./components/wrappers/PreviewSection";
import SummaryCard from "./components/preview-section/SummaryCard";
import ShowPreview from "./components/preview-section/ShowPreview";
import AppHeader from "./components/AppHeader";
import Services from "./components/mainFormContent/Services";
import DangerousGoods from "./components/mainFormContent/DangerousGoods";
import ShipmentType from "./components/mainFormContent/ShipmentType";
import PickupAdress from "./components/mainFormContent/PickupAdress";
import { useStatements } from "./context/states/useStates";

const App = () => {
  const { isPickup } = useStatements();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <AppHeader />
      <Layout>
        <ShipmentManager />
        <MainForm>
          <ShipmentType />
          <OriginFileInfo />
          <CurrentShipmentHeader />
          <ShipmentInformation />
          <RecipientAdress />
          {isPickup && <PickupAdress />}
          <Services />
          <DangerousGoods />
          {!isPickup && <Packages />}
          <Actions />
          <ShowPreview />
        </MainForm>
        <PreviewSection>
          <SummaryCard />
        </PreviewSection>
      </Layout>
    </div>
  );
};
export default App;
