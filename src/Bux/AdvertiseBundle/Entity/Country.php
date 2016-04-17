<?php
/**
 * Created by PhpStorm.
 * User: oparin
 * Date: 1/14/15
 * Time: 9:45 PM
 */

namespace Bux\AdvertiseBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Country
 * @package Bux\AdvertiseBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_countries")
 */
class Country
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $code;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\VideoAd", mappedBy="countries")
     **/
    private $videoAds;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\PollAd", mappedBy="countries")
     **/
    private $pollAds;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\AutoSerfAd", mappedBy="countries")
     **/
    private $autoSerfAds;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\BannerAd", mappedBy="countries")
     **/
    private $bannerAds;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\BigBannerAd", mappedBy="countries")
     **/
    private $bigBannerAds;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->videoAds = new \Doctrine\Common\Collections\ArrayCollection();
        $this->pollAds = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set code
     *
     * @param string $code
     *
     * @return Country
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code
     *
     * @return string 
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Country
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add videoAds
     *
     * @param \Bux\AdvertiseBundle\Entity\VideoAd $videoAds
     *
     * @return Country
     */
    public function addVideoAd(VideoAd $videoAds)
    {
        $this->videoAds[] = $videoAds;

        return $this;
    }

    /**
     * Remove videoAds
     *
     * @param \Bux\AdvertiseBundle\Entity\VideoAd $videoAds
     */
    public function removeVideoAd(VideoAd $videoAds)
    {
        $this->videoAds->removeElement($videoAds);
    }

    /**
     * Get videoAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getVideoAds()
    {
        return $this->videoAds;
    }

    /**
     * Add pollAds
     *
     * @param \Bux\AdvertiseBundle\Entity\PollAd $pollAds
     *
     * @return Country
     */
    public function addPollAd(PollAd $pollAds)
    {
        $this->pollAds[] = $pollAds;

        return $this;
    }

    /**
     * Remove pollAds
     *
     * @param \Bux\AdvertiseBundle\Entity\PollAd $pollAds
     */
    public function removePollAd(PollAd $pollAds)
    {
        $this->videoAds->removeElement($pollAds);
    }

    /**
     * Get pollAds
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPollAds()
    {
        return $this->pollAds;
    }

    /**
     * Add autoSerfAds
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfAd $autoSerfAds
     *
     * @return Country
     */
    public function addAutoSerfAd(AutoSerfAd $autoSerfAds)
    {
        $this->autoSerfAds[] = $autoSerfAds;

        return $this;
    }

    /**
     * Remove autoSerfAds
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfAd $autoSerfAds
     */
    public function removeAutoSerfAd(AutoSerfAd $autoSerfAds)
    {
        $this->autoSerfAds->removeElement($autoSerfAds);
    }

    /**
     * Get autoSerfAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAutoSerfAds()
    {
        return $this->autoSerfAds;
    }

    /**
     * Add bannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BannerAd $bannerAds
     *
     * @return Country
     */
    public function addBannerAd(BannerAd $bannerAds)
    {
        $this->bannerAds[] = $bannerAds;

        return $this;
    }

    /**
     * Remove bannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BannerAd $bannerAds
     */
    public function removeBannerAd(BannerAd $bannerAds)
    {
        $this->bannerAds->removeElement($bannerAds);
    }

    /**
     * Get bannerAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBannerAds()
    {
        return $this->bannerAds;
    }

    /**
     * Add bigBannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BigBannerAd $bigBannerAds
     *
     * @return Country
     */
    public function addBigBannerAd(BigBannerAd $bigBannerAds)
    {
        $this->bigBannerAds[] = $bigBannerAds;

        return $this;
    }

    /**
     * Remove bigBannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BigBannerAd $bigBannerAds
     */
    public function removeBigBannerAd(BigBannerAd $bigBannerAds)
    {
        $this->bigBannerAds->removeElement($bigBannerAds);
    }

    /**
     * Get bigBannerAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBigBannerAds()
    {
        return $this->bigBannerAds;
    }
}
