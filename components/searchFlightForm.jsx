import { Tabs } from "flowbite-react";
import {
  DateInput,
  FormSchema,
  GuestSelect,
  GuestOption,
  LocationSelect,
  useReactBookingForm,
  BookingForm as BookingFormType,
  LocationOption,
} from "react-booking-form";

const SearchFlightForm = () => {
  return (
    <div>
      <div className="mx-8 bg-white shadow-lg shadow-slate-300/100 rounded-md">
        <div className="p-4">
          <form action="/search" method="GET">
            <Tabs.Group
              aria-label="Tabs with underline"
              style="underline"
              className="border-none"
            >
              <Tabs.Item active={true} title="One-Way">
                <div className="flex flex-row">
                  <div id="from">
                    <label>Dari</label>
                    <input type="text"></input>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Roundtrip">Roundtrip</Tabs.Item>
            </Tabs.Group>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchFlightForm;
