<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/24/14
 * Time: 12:21 PM
 */

namespace Bux\Admin\HomeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class LoginLog
 *
 * @package Bux\Admin\HomeBundle\Entity
 * @ORM\Entity
 * @ORM\Table(name="bux_admin_login_log")
 */
class LoginLog
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * 0 - failure
     * 1 - success
     *
     * @ORM\Column(type="boolean")
     */
    protected $status;

    /**
     * @ORM\Column(type="string")
     */
    protected $login;

    /**
     * @ORM\Column(type="text", name="user_agent")
     */
    protected $userAgent;

    /**
     * @ORM\Column(type="string", name="ip_address")
     */
    protected $ipAddress;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $date;

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
     * Set userAgent
     *
     * @param string $userAgent
     *
     * @return LoginLog
     */
    public function setUserAgent($userAgent)
    {
        $this->userAgent = $userAgent;

        return $this;
    }

    /**
     * Get userAgent
     *
     * @return string 
     */
    public function getUserAgent()
    {
        return $this->userAgent;
    }

    /**
     * Set ipAddress
     *
     * @param string $ipAddress
     *
     * @return LoginLog
     */
    public function setIpAddress($ipAddress)
    {
        $this->ipAddress = $ipAddress;

        return $this;
    }

    /**
     * Get ipAddress
     *
     * @return string 
     */
    public function getIpAddress()
    {
        return $this->ipAddress;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return LoginLog
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set login
     *
     * @param string $login
     *
     * @return LoginLog
     */
    public function setLogin($login)
    {
        $this->login = $login;

        return $this;
    }

    /**
     * Get login
     *
     * @return string 
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * Set status
     *
     * @param boolean $status
     *
     * @return LoginLog
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return boolean 
     */
    public function getStatus()
    {
        return $this->status;
    }
}
