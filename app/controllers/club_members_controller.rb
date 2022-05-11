class ClubMembersController < ApplicationController
    before_action :find_club_member, only: [:show, :update, :destroy]
    def index
        render json: ClubMember.all
    end

    def show
        render json: @club_member
    end

    def create
        club_member = ClubMember.create!(club_member_params)
        render json: club_member, status: :created
    end

    def update
        @club_member.update!(club_member_params)
        render json: @club_member, status: :accepted
    end

    def destroy
     @club_member.destroy
     head :no_content
    # double check this one -> render json: {}, status :accepted
    end

private

    def find_club_member
        @club_member = ClubMember.find(params[:id])
    end

    def club_member_params
        params.permit(:club_id, :user_id)
    end
end
