class ClubsController < ApplicationController
    before_action :find_club, only: [:show, :update, :destroy]
    def index
        render json: Club.all
    end

    def show
        render json: @club
    end

    def create
        club = Club.create!(club_params)
        render json: club, status: :created
    end

    def update
        @club.update!(club_params)
        render json: @club, status: :accepted
    end

    def destroy
     @club.destroy
     head :no_content
    # double check this one -> render json: {}, status :accepted
    end

private

    def find_club
        @club = Club.find(params[:id])
    end

    def club_params
        params.permit(:name, :admin_id, :description, :image)
    end
end
