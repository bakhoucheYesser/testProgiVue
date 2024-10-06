import {defineStore} from 'pinia';
import {apiFetch} from '@/utils/api';

export const useVehicleTypeStore = defineStore('vehicleTypeStore', {
    state: () => ({
        vehicleTypes: []
    }),

    actions: {
        async fetchVehicleTypes() {
            try {
                const res = await apiFetch('/api/vehicle-types');
                if (res.ok) {
                    this.vehicleTypes = await res.json();
                } else {
                    console.error('Failed to fetch vehicle types');
                }
            } catch (error) {
                console.error('Error fetching vehicle types:', error);
            }
        },

        async createVehicleType(newVehicleType) {
            try {
                const adjustedVehicleType = {
                    ...newVehicleType,
                    basic_fee_rate: newVehicleType.basic_fee_rate ,
                    special_fee_rate: newVehicleType.special_fee_rate
                };

                const res = await apiFetch('/api/vehicle-types', {
                    method: 'POST',
                    body: JSON.stringify(adjustedVehicleType),
                });

                if (res.ok) {
                    const createdVehicleType = await res.json();
                    this.vehicleTypes.push(createdVehicleType.vehicleType);
                }
            } catch (error) {
                console.error('Failed to create vehicle type:', error);
            }
        },

        async updateVehicleType(id, updatedVehicleType) {
            try {
                const adjustedVehicleType = {
                    ...updatedVehicleType,
                    basic_fee_rate: updatedVehicleType.basic_fee_rate / 100,
                    special_fee_rate: updatedVehicleType.special_fee_rate / 100,
                };

                const res = await apiFetch(`/api/vehicle-types/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(adjustedVehicleType),
                });

                if (res.ok) {
                    const updated = await res.json();
                    const index = this.vehicleTypes.findIndex((v) => v.id === id);
                    this.vehicleTypes[index] = updated.vehicleType;
                }
            } catch (error) {
                console.error('Failed to update vehicle type:', error);
            }
        },

        async deleteVehicleType(id) {
            try {
                const res = await apiFetch(`/api/vehicle-types/${id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    await this.fetchVehicleTypes(); // Fetch updated vehicle types after deletion
                    console.log(`Deleted vehicle type with ID: ${id}`);
                } else {
                    console.error('Failed to delete vehicle type');
                }
            } catch (error) {
                console.error('Error deleting vehicle type:', error);
            }
        }
    }
});
