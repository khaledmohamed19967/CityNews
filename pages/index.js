import GoogleMapComponent from "../components/GoogleMapComponent";
import SelectCountry from "../components/SelectCountry";
import { Card } from 'primereact/card';

export default function Home() {
  return (
    <div>
      <div className="home_page">
          {/*start map component*/}
          <GoogleMapComponent/>
          {/*start map component*/}

          {/* start select city */}
          <Card title="Select City" subTitle="Select City To See What's the new's">
              <SelectCountry/>
          </Card>

          {/* end select city */}
      </div>
    </div>
  )
}
