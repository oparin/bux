<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/30/15
 * Time: 1:35 PM
 */

namespace Bux\Admin\UtilitiesBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class BotGeneralSettings
 *
 * @package Bux\Admin\UtilitiesBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_bot_general_settings")
 */
class BotGeneralSettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="decimal", scale=3, name="click_value")
     */
    protected $clickValue;

    /**
     * @ORM\Column(type="decimal", scale=3, name="video_value")
     */
    protected $videoValue;

    /**
     * @ORM\Column(type="decimal", scale=3, name="poll_value")
     */
    protected $pollValue;

    /**
     * 0 - Rent Bots Only
     * 1 - Rent Real Members First
     * 2 - Random
     * 3 - Only Real Members
     * 
     * @ORM\Column(type="smallint", name="rent_option")
     */
    protected $rentOption;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set clickValue
     *
     * @param string $clickValue
     *
     * @return BotGeneralSettings
     */
    public function setClickValue($clickValue)
    {
        $this->clickValue = $clickValue;

        return $this;
    }

    /**
     * Get clickValue
     *
     * @return string 
     */
    public function getClickValue()
    {
        return $this->clickValue;
    }

    /**
     * Set videoValue
     *
     * @param string $videoValue
     *
     * @return BotGeneralSettings
     */
    public function setVideoValue($videoValue)
    {
        $this->videoValue = $videoValue;

        return $this;
    }

    /**
     * Get videoValue
     *
     * @return string 
     */
    public function getVideoValue()
    {
        return $this->videoValue;
    }

    /**
     * Set pollValue
     *
     * @param string $pollValue
     *
     * @return BotGeneralSettings
     */
    public function setPollValue($pollValue)
    {
        $this->pollValue = $pollValue;

        return $this;
    }

    /**
     * Get pollValue
     *
     * @return string 
     */
    public function getPollValue()
    {
        return $this->pollValue;
    }

    /**
     * Set rentOption
     *
     * @param integer $rentOption
     *
     * @return BotGeneralSettings
     */
    public function setRentOption($rentOption)
    {
        $this->rentOption = $rentOption;

        return $this;
    }

    /**
     * Get rentOption
     *
     * @return integer 
     */
    public function getRentOption()
    {
        return $this->rentOption;
    }
}
