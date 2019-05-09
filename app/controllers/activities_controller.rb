class ActivitiesController < ApplicationController
  before_action :set_activity, only: %i[show update destroy]



  # GET /activities
  def index
    @user = User.find(params[:user_id])
    @activities = @user.activities

    render json: @activities
  end


  # GET /activities/1
  def show
    @user = User.find(params[:user_id])
    @activity = Activity.find(params[:id])

    render json: @activity
    # render plain: "Moons: " + params[:id]
  end



  # POST /activities
  def create
    @user = User.find(params[:user_id])
    @activity = Activity.new(activity_params)
    @user.activities << @activity

    if @activity.save
      render json: @user, include: :activities, status: :created
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /activities/1
  def update
    if params[:user_id]
      @user = User.find(params[:user_id])
      @activity.update(activity_params)
      render json: @user, include: :activities
    elsif @activity.update(activity_params)
      render json: @activity
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  # DELETE /activities/1
  def destroy
    @user = User.find(params[:user_id])
    # @activity = Activity.destroy(activity_params)
    @activity.destroy
    # XXXXXXXX  ED 3:20 MONDAY:  NOT SURE IF LINE @activity = Activity.destroy(activity_params) WORKS OR NOT. ONE ALTERNATIVE IS JUST @activity.destroy
  end
  

  private
  
  # Use callbacks to share common setup or constraints between actions.
  def set_activity
    # @user = User.find(params[:user_id])
    @activity = Activity.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'no activity matches that ID' }, status: 404
  end

  # Only allow a trusted parameter "white list" through.
  def activity_params
    params.require(:activity).permit(:name, :category, :hours_spent, :date)
  end
end





# XXXXXXXXXXXXXXXXXX  STUFF FROM PLANETS
# class MoonsController < ApplicationController
#   def index
#       @planet = Planet.find(params[:planet_id])
#       @moons = @planet.moons
#   end
#   def show
#       @planet = Planet.find(params[:planet_id])
#       @moon = Moon.find(params[:id])
#       # render plain: "Moons: " + params[:id]
#   end
# end

# XXXXXXXXXXXXXXXXXX













# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# BELOW IS CODE FROM PLANETS

# class MoonsController < ApplicationController
#   def index
#       @planet = Planet.find(params[:planet_id])
#       @moons = @planet.moons
#   end
#   def show
#       @planet = Planet.find(params[:planet_id])
#       @moon = Moon.find(params[:id])
#       # render plain: "Moons: " + params[:id]
#   end
# end







# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# BELOW IS CODE BEFORE I ADAPTED TO FOLLOW SCHOOL APP TEMPLATE


# class ActivitiesController < ApplicationController
#   before_action :set_activity, only: [:show, :edit, :update, :destroy]

  # GET /activities
  # GET /activities.json
  # def index
  #   @activities = Activity.all
  # end


  # GET /activities/1
  # GET /activities/1.json
  # def show
  # end

  # GET /activities/new
  # def new
  #   @activity = Activity.new
  # end

  # GET /activities/1/edit
  # def edit
  # end

  # POST /activities
  # POST /activities.json
  # def create
  #   @activity = Activity.new(activity_params)

  #   respond_to do |format|
  #     if @activity.save
  #       format.html { redirect_to @activity, notice: 'Activity was successfully created.' }
  #       format.json { render :show, status: :created, location: @activity }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @activity.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # PATCH/PUT /activities/1
  # PATCH/PUT /activities/1.json
  # def update
  #   respond_to do |format|
  #     if @activity.update(activity_params)
  #       format.html { redirect_to @activity, notice: 'Activity was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @activity }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @activity.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /activities/1
  # DELETE /activities/1.json
  # def destroy
  #   @activity.destroy
  #   respond_to do |format|
  #     format.html { redirect_to activities_url, notice: 'Activity was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  # private
    # Use callbacks to share common setup or constraints between actions.
    # def set_activity
    #   @activity = Activity.find(params[:id])
    # end

    # Never trust parameters from the scary internet, only allow the white list through.
#     def activity_params
#       params.require(:activity).permit(:name, :category, :hours_spent, :date, :user_id, :goal_id)
#     end
# end
